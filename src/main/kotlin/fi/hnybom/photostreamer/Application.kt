package fi.hnybom.photostreamer

import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.http.CacheControl
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry

/**
 * Created by hnybom on 8.6.2016.
 */

val rootFolder = "/volume1/Verkkolevy/sync/Google valokuvat"
val rootFolder2 = "/Volumes/Verkkolevy/sync/Google valokuvat"


@SpringBootApplication
open class Application : WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter() {

    @Bean
    open fun objectMapperBuilder(): Jackson2ObjectMapperBuilder
            = Jackson2ObjectMapperBuilder().modulesToInstall(KotlinModule())


    override fun addResourceHandlers(registry: ResourceHandlerRegistry?) {

        if(registry != null) {
            registry.addResourceHandler("/images/**")
                    .addResourceLocations("file:" + fi.hnybom.photostreamer.rootFolder2 + "/")

            registry.addResourceHandler("/**")
                    .addResourceLocations("classpath:/public/")
                    .setCacheControl(CacheControl.noCache());
        }

    }
}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}
