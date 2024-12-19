FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/client-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
