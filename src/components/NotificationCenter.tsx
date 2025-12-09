import { useNotificationStore } from '@/stores/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function NotificationCenter() {
  const { notifications, removeNotification, markAsRead } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-info" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-l-4 border-success';
      case 'error':
        return 'bg-red-50 border-l-4 border-error';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-warning';
      case 'info':
      default:
        return 'bg-blue-50 border-l-4 border-info';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md space-y-3">
      <AnimatePresence>
        {notifications.slice(0, 3).map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`${getBackgroundColor(notification.type)} rounded-lg p-4 shadow-lg flex items-start gap-3`}
          >
            {getIcon(notification.type)}
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-darktext">{notification.title}</h3>
              <p className="text-xs text-darktext/70 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-darktext/50 hover:text-darktext transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
