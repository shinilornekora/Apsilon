FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
COPY ./auditDemo/pom.xml .
COPY ./auditDemo/src ./src
RUN mvn clean package -DskipTests
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/auditDemo-1.0-SNAPSHOT.jar app.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "app.jar"]
