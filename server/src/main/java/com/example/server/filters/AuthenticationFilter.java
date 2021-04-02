package com.example.server.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.server.services.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

@WebFilter(filterName = "AuthenticationFilter", urlPatterns = {"/posts/*", "/users/*"})
public class AuthenticationFilter implements Filter {

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        String method = httpServletRequest.getMethod();
        String uri = httpServletRequest.getRequestURI();
        if ("POST".equals(method) && uri.contains("users")) {
            chain.doFilter(httpServletRequest, httpServletResponse);
        } else {
            try {
                String token = httpServletRequest.getHeader("authorization").substring(6);
                if (authenticationService.validateToken(token)) {
                    chain.doFilter(httpServletRequest, httpServletResponse);
                } else {
                    httpServletResponse.sendError(401, "INVALID TOKEN");
                }
            } catch(Exception e) {
                httpServletResponse.sendError(401, "TOKEN NOT PROVIDED");
            }
        }
    }
}
