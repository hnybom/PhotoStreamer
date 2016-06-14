package fi.hnybom.photostreamer.service

import com.drew.imaging.ImageMetadataReader
import com.drew.metadata.exif.ExifIFD0Directory
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import java.io.File
import java.util.*

/**
 * Created by hnybom on 8.6.2016.
 */

data class Photo(val name: String, val timestamp: Date, val path: String)

@Service
class FileSystemSource {

    private val rootFolder = "/volume1/Verkkolevy/sync/Google valokuvat"

    private val rootFolder2 = "/Volumes/Verkkolevy/sync/Google valokuvat"

    val emptyPhoto = Photo("", Date(), "")

    val photos: List<Photo>

    init {
        System.out.println("Init")
        val walker = File(rootFolder2).walkTopDown()
        val mappedPhotos = walker.map(fun(file): Photo {
            if(file.name.endsWith("jpg", true) || file.name.endsWith("jpeg", true)) {
                System.out.println(file);
                return Photo(file.name, Date(file.lastModified()), file.absolutePath)
            }
            return emptyPhoto
        })

        photos = mappedPhotos.filter { f -> f != emptyPhoto }.sortedBy { p -> p.timestamp }.toList()
    }

    fun findPhotos(start:Date, end:Date):List<Photo> {
        return photos.filter { p -> p.timestamp.after(start) && p.timestamp.before(end) }
    }

}