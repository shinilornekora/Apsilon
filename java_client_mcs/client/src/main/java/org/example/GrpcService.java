package org.example;

import io.grpc.Server;
import io.grpc.ServerBuilder;

public class GrpcService {
    public static void main(String[] args) throws Exception {
        Server server = ServerBuilder
                .forPort(8082)
                .addService(new MessageService())
                .build();
        server.start();
        System.out.println("Server started on port 8082");
        server.awaitTermination();
    }
}
