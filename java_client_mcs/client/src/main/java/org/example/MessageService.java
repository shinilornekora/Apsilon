package org.example;

import com.example.grpc.MessageServiceGrpc;
import com.example.grpc.MessageServiceProto;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;

public class MessageService extends MessageServiceGrpc.MessageServiceImplBase {
//    необходимо принять request от gateway / видимо распарсить его в тип PublishTemplateRequest
//    ну и направить этот запрос на grpc для этого как раз есть templatePublisherClient
    @Override
    public void sendMessage(MessageServiceProto.RequestMessage request, StreamObserver<MessageServiceProto.ResponseMessage> responseObserver) {
        System.out.println("i get our message in grpc client :" + request.getText());
        // Преобразование JSON в PublishTemplateRequest
       /* Moderation.PublishTemplateRequest.Builder requestBuilder = Moderation.PublishTemplateRequest.newBuilder();
        try {
            JsonFormat.parser().merge(request.getText(), requestBuilder);
        } catch (InvalidProtocolBufferException e) {
            System.err.println("Failed to parse JSON: " + e.getMessage());
            return;
        }

        Moderation.PublishTemplateRequest requestForBackend = requestBuilder.build();
        System.out.println("we have nex protobuf object^");
        System.out.println(requestForBackend);
*/
// открываем канал к grpcBackend
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 8081)
                .usePlaintext()
                .build();
        TemplatePublisherClient client = new TemplatePublisherClient(channel);
        Moderation.PublishTemplateResponse responseFromBackend = client.publishTemplate(request.getText());

        MessageServiceProto.ResponseMessage response =
                MessageServiceProto.ResponseMessage.newBuilder()
                        .setReply(responseFromBackend.toString())
                        .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
