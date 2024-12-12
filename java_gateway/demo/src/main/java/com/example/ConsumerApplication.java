package com.example;

import io.grpc.StatusRuntimeException;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.grpc.MessageServiceProto.RequestMessage;

@SpringBootApplication
public class ConsumerApplication {
    static final String QUEUE_NAME = "requestQueue";

    @Autowired
    private final RabbitTemplate rabbitTemplate;

    public ConsumerApplication(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Bean
    public Queue myQueue() {
        return new Queue(QUEUE_NAME, true);
    }

    @RabbitListener(queues = QUEUE_NAME)
    public void listen(String message) {
        System.out.println("[" + QUEUE_NAME + "]: " + message);
        RequestMessage request = RequestMessage.newBuilder()
                .setText(message)
                .build();

        try {
            GatewayClient gatewayClient = new GatewayClient(rabbitTemplate);
            gatewayClient.sendMessageFromGateway(request);
        } catch (StatusRuntimeException e) {
            System.err.println("GRPC RPC failed: " + e.getStatus());
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }
}
