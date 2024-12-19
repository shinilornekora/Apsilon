module.exports = async function initPublisher(channel) {
    return {
        send: async (message) => {
            console.log(message);
            try {
                await channel.sendToQueue('requestQueue', Buffer.from(message), {
                    persistent: true
                });
                await channel.sendToQueue('auditQueue', Buffer.from(message), {
                    persistent: true
                });
                console.log("Message was successfully sent to the queue!");
            } catch (error) {
                console.error("Failed to send message:", error);
                throw error;
            }
        }
    };
};
