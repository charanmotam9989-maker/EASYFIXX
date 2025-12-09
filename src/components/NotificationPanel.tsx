import { useNotificationStore } from '@/stores/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, removeNotification, markAsRead, clearAll } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

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
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'info':
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-darktext">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-primary mt-1">{unreadCount} unread</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-darktext/50 hover:text-darktext transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex items-center justify-center h-full text-darktext/50">
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 ${getBackgroundColor(notification.type)} ${
                        !notification.read ? 'border-l-4 border-primary' : ''
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <div className="flex items-start gap-3">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-darktext">
                            {notification.title}
                          </h3>
                          <p className="text-xs text-darktext/70 mt-1">{notification.message}</p>
                          <p className="text-xs text-darktext/50 mt-2">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-darktext/50 hover:text-darktext transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
