package com.example;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * Конфигурация для двух очередей
 * gRPC queue - очередь, которую слушает grpc сервис
 * Audit queue - чередь, котрую слушает audit (нет реализации)
 * */
@Configuration
public class RMQConfig {

    @Bean
    public Queue grpcQueue() {
        return new Queue("auditGatewayQueue", true);
    }

    @Bean
    public Binding bindingGrpcQueue(Queue grpcQueue) {
        return BindingBuilder.bind(grpcQueue)
                .to(new org.springframework.amqp.core.DirectExchange(""))
                .with("auditGatewayQueue");
    }
}
