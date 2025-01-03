import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
    useRef,
} from "react";
import styles from "./Notification.module.css";

const Notification = forwardRef((_, ref) => {
    const [notifications, setNotifications] = useState([]);
    const containerRefs = useRef({});

    useImperativeHandle(ref, () => ({
        addNotification(message, type, duration = 3000) {
            const id = Date.now();
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                { message, type, id, isFadingOut: false },
            ]);

            setTimeout(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) =>
                        notification.id === id
                            ? { ...notification, isFadingOut: true }
                            : notification
                    )
                );

                setTimeout(() => {
                    removeNotification(id);
                }, 500);
            }, duration);
        },
    }));

    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    const calculatePositions = () => {
        let totalHeight = 20;
        Object.keys(containerRefs.current).forEach((id) => {
            const element = containerRefs.current[id];
            if (element) {
                element.style.bottom = `${totalHeight}px`;
                totalHeight += element.offsetHeight + 10;
            }
        });
    };

    useEffect(() => {
        calculatePositions();
    }, [notifications]);

    return (
        <div>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    ref={(el) => (containerRefs.current[notification.id] = el)}
                    className={`${styles.Container} ${
                        styles[notification.type]
                    } ${notification.isFadingOut ? styles.fadeOut : ""}`}
                >
                    <div
                        className={`${styles.icon} ${
                            styles[`${notification.type}Icon`]
                        }`}
                    >
                        {getIcon(notification.type)}
                    </div>
                    <div className={styles.text}>{notification.message}</div>
                </div>
            ))}
        </div>
    );
});

const getIcon = (type) => {
    switch (type) {
        case "success":
            return "✔";
        case "error":
            return "✖";
        case "warning":
            return "⚠";
        case "info":
            return "ℹ";
        default:
            return "";
    }
};

export default Notification;
