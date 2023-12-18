package com.example.backend_lms.config;

import com.example.backend_lms.filter.StaticContentFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<StaticContentFilter> customFilterRegistration() {
        FilterRegistrationBean<StaticContentFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new StaticContentFilter());
        registrationBean.addUrlPatterns("/api/*");

        return registrationBean;
    }
}