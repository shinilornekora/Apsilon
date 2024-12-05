package com.example;

import com.example.grpc.MessageServiceProto;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

public class GatewayClient {
    private final ManagedChannel channel;
    private final com.example.grpc.MessageServiceGrpc.MessageServiceBlockingStub blockingStub;

    public GatewayClient() {
        // Создаем GRPC канал и клиент
        this.channel = ManagedChannelBuilder.forAddress("localhost", 8082) // адрес вашего GRPC сервиса
                .usePlaintext() // отключение шифрования для тестов
                .build();
        this.blockingStub = com.example.grpc.MessageServiceGrpc.newBlockingStub(channel);
    }
    public void sendMessageFromGateway(MessageServiceProto.RequestMessage request){
        MessageServiceProto.ResponseMessage response = blockingStub.sendMessage(request);
        System.out.println(response);
    }
}
