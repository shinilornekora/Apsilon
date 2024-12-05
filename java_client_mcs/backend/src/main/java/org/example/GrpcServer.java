package org.example;

import io.grpc.Server;
import io.grpc.ServerBuilder;

public class GrpcServer {
    public static void main(String[] args) throws Exception {
        Server server = ServerBuilder
                .forPort(8081)
                .addService(new TemplateModerationService())
                .build();
        server.start();
        System.out.println("Server started on port 8081");
        server.awaitTermination();
    }
}
