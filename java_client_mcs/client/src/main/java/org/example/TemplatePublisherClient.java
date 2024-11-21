package org.example;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;

import org.example.TemplateModerationGrpc;
import org.example.Moderation.PublishTemplateRequest;
import org.example.Moderation.PublishTemplateResponse;

public class TemplatePublisherClient {

    private final TemplateModerationGrpc.TemplateModerationBlockingStub blockingStub;

    public TemplatePublisherClient(ManagedChannel channel) {
        blockingStub = TemplateModerationGrpc.newBlockingStub(channel);
    }

    public void publishTemplate(String templateJson) {
        Gson gson = new Gson();
        JsonObject requestJson = gson.fromJson(templateJson, JsonObject.class);

        String requestType = requestJson.get("request_type").getAsString();

        PublishTemplateRequest request = PublishTemplateRequest.newBuilder()
                .setRequestType(requestType)
                .setTemplateContent(requestJson.get("template_content").getAsString())
                .setTemplateName(requestJson.get("template_name").getAsString())
                .setAuthor(requestJson.get("author").getAsString())
                .build();

        PublishTemplateResponse response;

        try {
            response = blockingStub.publishTemplate(request);
            handleResponse(response);
        } catch (StatusRuntimeException e) {
            System.err.println("RPC failed: " + e.getStatus());
        }
    }

    private void handleResponse(PublishTemplateResponse response) {
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("template_name", response.getTemplateName());
        responseJson.addProperty("author", response.getAuthor());
        responseJson.addProperty("status", response.getStatus());

        if ("REJECTED".equals(response.getStatus())) {
            responseJson.addProperty("description", response.getDescription());
            System.out.println("Sending to notifier: " + responseJson.toString());
            return;
        }

        responseJson.addProperty("comment", response.getComment());
        responseJson.addProperty("rating", response.getRating());
        System.out.println("Approved template: " + responseJson.toString());
    }

    public static void main(String[] args) throws InterruptedException {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        TemplatePublisherClient client = new TemplatePublisherClient(channel);

        // Пример сообщения из веба
        String jsonString = "{\"request_type\":\"publication\",\"template_content\":\"<h1>Welcome</h1>\",\"template_name\":\"welcome_template\",\"author\":\"User123\"}";

        client.publishTemplate(jsonString);

        channel.shutdownNow();
    }
}
