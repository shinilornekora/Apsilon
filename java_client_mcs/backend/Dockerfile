FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/client-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
