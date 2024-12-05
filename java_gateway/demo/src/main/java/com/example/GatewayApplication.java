package com.example;

import com.example.grpc.MessageServiceProto;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.grpc.MessageServiceGrpc;
import com.example.grpc.MessageServiceProto.RequestMessage;

@SpringBootApplication
public class GatewayApplication {
    static final String QUEUE_NAME = "requestQueue";
    static final String NOTIFIER_QUEUE_NAME = "notifierQueue";

    private final ManagedChannel channel;
    private final MessageServiceGrpc.MessageServiceBlockingStub blockingStub;
    private final RabbitTemplate rabbitTemplate;

    public GatewayApplication() {
        // Создаем GRPC канал и клиент
        this.channel = ManagedChannelBuilder.forAddress("localhost", 8080)
                .usePlaintext()
                .build();
        this.blockingStub = MessageServiceGrpc.newBlockingStub(channel);
        this.rabbitTemplate = new RabbitTemplate();
    }

    @Bean
    public Queue myQueue() {
        return new Queue(QUEUE_NAME, false);
    }

    @RabbitListener(queues = QUEUE_NAME)
    public void listen(String message) {
        System.out.println("[" + QUEUE_NAME + "]: " + message);

        RequestMessage request = RequestMessage.newBuilder()
                .setText(message)
                .build();

        try {
            final MessageServiceProto.ResponseMessage result = blockingStub.sendMessage(request);
            rabbitTemplate.convertAndSend(NOTIFIER_QUEUE_NAME, result);
        } catch (StatusRuntimeException e) {
            System.err.println("GRPC RPC failed: " + e.getStatus());
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
