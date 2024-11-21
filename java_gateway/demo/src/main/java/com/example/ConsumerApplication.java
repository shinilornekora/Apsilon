package com.example;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.grpc.MessageServiceGrpc;
import com.example.grpc.MessageServiceProto.RequestMessage;

@SpringBootApplication
public class ConsumerApplication {
    static final String QUEUE_NAME = "requestQueue";

    private final ManagedChannel channel;
    private final MessageServiceGrpc.MessageServiceBlockingStub blockingStub;

    public ConsumerApplication() {
        // Создаем GRPC канал и клиент
        this.channel = ManagedChannelBuilder.forAddress("localhost", 8080) // адрес вашего GRPC сервиса
                .usePlaintext() // отключение шифрования для тестов
                .build();
        this.blockingStub = MessageServiceGrpc.newBlockingStub(channel);
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
            blockingStub.sendMessage(request);
        } catch (StatusRuntimeException e) {
            System.err.println("GRPC RPC failed: " + e.getStatus());
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }
}
