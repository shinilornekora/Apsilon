package org.example;

import com.example.grpc.MessageServiceGrpc;
import com.example.grpc.MessageServiceProto;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;

public class MessageService extends MessageServiceGrpc.MessageServiceImplBase {
    @Override
    public void sendMessage(MessageServiceProto.RequestMessage request, StreamObserver<MessageServiceProto.ResponseMessage> responseObserver) {
        System.out.println("i get our message in grpc client :" + request.getText());

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
