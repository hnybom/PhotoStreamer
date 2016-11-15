package fi.hnybom.photostreamer.service

import fi.hnybom.photostreamer.rootFolder2
import org.springframework.stereotype.Service
import java.io.File
import java.util.*

/**
 * Created by hnybom on 8.6.2016.
 */

data class Photo(val name: String, val timestamp: Date, val path: String)

@Service
class FileSystemSource {

    var photos: List<Photo>

    val MUTEX = ""

    init {
        photos = walkPhotos()
    }

    private fun walkPhotos(): List<Photo> {
        val walker = File(fi.hnybom.photostreamer.rootFolder2).walkTopDown()
        return walker
                .filter { it.name.endsWith("jpg", true) || it.name.endsWith("jpeg", true) }
                .map { Photo(it.name, Date(it.lastModified()), "/images/" + it.absolutePath.substring(rootFolder2.length)) }
                .sortedBy { it.timestamp }.toList()
    }

    fun findPhotos(start:Date, end:Date):List<Photo> {
        synchronized(MUTEX) {
            return photos.filter { it.timestamp.after(start) && it.timestamp.before(end) }
        }
    }

    fun initPhotos() {
        synchronized(MUTEX) {
            photos = walkPhotos()
        }
    }



}