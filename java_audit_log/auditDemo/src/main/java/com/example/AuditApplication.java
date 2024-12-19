package com.example;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.FileWriter;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@SpringBootApplication
public class AuditApplication {
    static final String queueName = "auditQueue";
    static final String auditQueueName = "auditGatewayQueue";
    private static final String outputFilePath = "messages.csv";
    private static final String outputGatewayFilePath = "messagesFromGateway.csv";

    // Пул потоков для записи в файл
    private final ExecutorService executorService = Executors.newFixedThreadPool(2);

    @Bean
    public Queue myQueue() {
        return new Queue(queueName, true);
    }

    @RabbitListener(queues = queueName)
    public void listen(String message) {
        System.out.println("Message read from auditQueue : " + message);
        executorService.submit(() -> writeToFile(message, outputFilePath));
    }

    @RabbitListener(queues = auditQueueName)
    public void listenGateway(String message) {
        System.out.println("Message read from auditGatewayQueue : " + message);
        executorService.submit(() -> writeToFile(message, outputGatewayFilePath));
    }

    private void writeToFile(String message, String outputFilePath) {
        try (FileWriter fileWriter = new FileWriter(outputFilePath, true)) {
            fileWriter.append(message).append("\n");
            System.out.println("Message saved to " + outputFilePath);
        } catch (IOException e) {
            System.err.println("Failed to write message to file: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(AuditApplication.class, args);
    }
}
