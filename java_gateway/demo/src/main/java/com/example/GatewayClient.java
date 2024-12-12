package com.example;

import com.example.grpc.MessageServiceProto;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GatewayClient {
    static final String NOTIFIER_QUEUE = "notifierQueue";

    private final RabbitTemplate rabbitTemplate;
    private final ManagedChannel channel;
    private final com.example.grpc.MessageServiceGrpc.MessageServiceBlockingStub blockingStub;

    public GatewayClient(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        this.channel = ManagedChannelBuilder.forAddress("localhost", 8082)
                .usePlaintext()
                .build();
        this.blockingStub = com.example.grpc.MessageServiceGrpc.newBlockingStub(channel);

    }
    public void sendMessageFromGateway(MessageServiceProto.RequestMessage request){
        MessageServiceProto.ResponseMessage response = blockingStub.sendMessage(request);
        rabbitTemplate.convertAndSend(NOTIFIER_QUEUE, response);
        System.out.println(response);
    }
}
