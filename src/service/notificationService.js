import { getOrderList, confirmedOrder } from "./orderService.js";

export const getNotifications = async () => {
    try {
        console.log('🔄 Starting getNotifications...');
        const notifications = [];
        const now = new Date();

        // Lấy đơn hàng chưa xác nhận
        console.log('📦 Fetching pending orders...');
        const pendingResult = await getOrderList();
        console.log('📦 Pending result:', pendingResult);
        let pendingOrders = [];
        if (pendingResult && pendingResult.data) {
            pendingOrders = pendingResult.data;
            console.log('📦 Pending orders count:', pendingOrders.length);
        } else {
            console.log('⚠️ No pending orders data received');
        }

        // Lấy đơn hàng đã xác nhận
        console.log('✅ Fetching confirmed orders...');
        const confirmedResult = await confirmedOrder();
        console.log('✅ Confirmed result:', confirmedResult);
        let confirmedOrders = [];
        if (confirmedResult && confirmedResult.orders) {
            confirmedOrders = confirmedResult.orders;
            console.log('✅ Confirmed orders count:', confirmedOrders.length);
        } else {
            console.log('⚠️ No confirmed orders data received');
        }

        // Tạo notification cho đơn hàng chưa xác nhận
        pendingOrders.forEach(order => {
            const hoursSinceCreated = (now - new Date(order.createdAt)) / (1000 * 60 * 60);
            let priority = 'normal';
            let title = 'Đơn hàng mới cần xác nhận';
            let message = `Đơn hàng #${order.id} đã được đặt`;

            if (hoursSinceCreated > 24) {
                priority = 'urgent';
                title = 'Đơn hàng quá hạn chưa xử lý';
                message = `Đơn hàng #${order.id} đã quá ${Math.floor(hoursSinceCreated)}h chưa được xác nhận`;
            } else if (hoursSinceCreated > 2) {
                priority = 'high';
                message = `Đơn hàng #${order.id} đã được đặt cách đây ${Math.floor(hoursSinceCreated)} giờ`;
            }

            // Kiểm tra nếu đơn hàng có giá trị cao (VIP)
            if (order.totalPrice > 1000000) {
                priority = priority === 'urgent' ? 'urgent' : 'high';
                title = 'Đơn hàng VIP cần ưu tiên';
                message = `Khách hàng đã đặt đơn hàng lớn trị giá ${formatPrice(order.totalPrice)}`;
            }

            notifications.push({
                id: `order_${order.id}`,
                title,
                message,
                type: 'new_order',
                priority,
                read: false,
                createdAt: new Date(order.createdAt),
                orderDetails: {
                    id: order.id,
                    customerName: order.customerName || order.fullName || 'Khách hàng',
                    total: order.totalPrice,
                    createdAt: new Date(order.createdAt)
                }
            });
        });

        // Tạo notification cho đơn hàng đã xử lý hôm nay
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        confirmedOrders.forEach(order => {
            const confirmedDate = new Date(order.confirmedAt || order.updatedAt);
            if (confirmedDate >= today) {
                notifications.push({
                    id: `confirmed_${order.id}`,
                    title: 'Đơn hàng đã được xử lý',
                    message: `Đơn hàng #${order.id} đã được xác nhận và chuyển sang sản xuất`,
                    type: 'order_processed',
                    priority: 'normal',
                    read: true,
                    createdAt: confirmedDate,
                    orderDetails: {
                        id: order.id,
                        customerName: order.customerName || order.fullName || 'Khách hàng',
                        total: order.totalPrice,
                        createdAt: new Date(order.createdAt)
                    }
                });
            }
        });

        return {
            success: true,
            notifications: notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            pendingOrders,
            confirmedOrders
        };
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return {
            success: false,
            error: error.message,
            notifications: [],
            pendingOrders: [],
            confirmedOrders: []
        };
    }
};

export const getNotificationStats = async () => {
    try {
        const result = await getNotifications();
        if (!result.success) {
            return { success: false, error: result.error };
        }

        const { notifications, pendingOrders, confirmedOrders } = result;
        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return {
            success: true,
            stats: {
                urgent: pendingOrders.filter(order => {
                    const hoursSinceCreated = (now - new Date(order.createdAt)) / (1000 * 60 * 60);
                    return hoursSinceCreated > 24;
                }).length,
                pending: pendingOrders.length,
                today: pendingOrders.filter(order => new Date(order.createdAt) >= today).length,
                processed: confirmedOrders.filter(order => {
                    const confirmedDate = new Date(order.confirmedAt || order.updatedAt);
                    return confirmedDate >= today;
                }).length,
                unread: notifications.filter(n => !n.read).length
            }
        };
    } catch (error) {
        console.error('Error fetching notification stats:', error);
        return { success: false, error: error.message };
    }
};

// Helper function
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};
