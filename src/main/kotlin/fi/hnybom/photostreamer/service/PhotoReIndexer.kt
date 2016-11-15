package fi.hnybom.photostreamer.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

/**
 * Created by hnybom on 30.8.2016.
 */

@Component
class PhotoReIndexer @Autowired constructor(val service:FileSystemSource) {

    @Scheduled(fixedRate = 3600)
    fun reIxdex() {
        service.initPhotos()
    }

}