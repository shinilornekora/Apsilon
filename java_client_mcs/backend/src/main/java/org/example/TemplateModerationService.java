package org.example;

import io.grpc.stub.StreamObserver;
import org.example.Moderation.PublishTemplateRequest;
import org.example.Moderation.PublishTemplateResponse;

public class TemplateModerationService extends TemplateModerationGrpc.TemplateModerationImplBase {

    @Override
    public void publishTemplate(PublishTemplateRequest request, StreamObserver<PublishTemplateResponse> responseObserver) {
        // Логика оценки шаблона
        String status;
        String comment = "";
        String description = "";
        int rating = 0;

        // Пример логики оценки
        if (request.getTemplateContent().contains("<script>")) {
            status = "REJECTED";
            description = "HTML содержит недопустимый тег <script>.";
        } else {
            status = "APPROVED";
            comment = "Шаблон успешно опубликован.";
            rating = 5; // Пример рейтинга
        }

        PublishTemplateResponse response = PublishTemplateResponse.newBuilder()
                .setTemplateName(request.getTemplateName())
                .setAuthor(request.getAuthor())
                .setStatus(status)
                .setComment(comment)
                .setDescription(description)
                .setRating(rating)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}