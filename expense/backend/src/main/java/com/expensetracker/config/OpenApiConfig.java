package com.expensetracker.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI expenseOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hybrid Smart Expense Tracker API")
                        .version("1.0")
                        .description("Production-grade backend APIs for Expense Tracker")
                        .contact(new Contact().name("Expense Tracker Team")));
    }
}
