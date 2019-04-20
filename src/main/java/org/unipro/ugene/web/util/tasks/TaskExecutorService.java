package org.unipro.ugene.web.util.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledFuture;

@Service("UniproTaskExecutorService")
public class TaskExecutorService {

    @Autowired
    @Qualifier("UniproThreadPoolTaskScheduler")
    ThreadPoolTaskScheduler taskScheduler;

    private Map<String,Future<?>> taskMap = new HashMap<>();

    public ScheduledFuture<?> scheduleWithFixedDelay(String id, Runnable runnable, Long delay) {
        ScheduledFuture<?> task = taskScheduler.scheduleWithFixedDelay(runnable, delay);
        taskMap.put(id, task);
        return task;
    }

    public boolean isRun(String id) {
        Future<?> task = taskMap.get(id);
        return !task.isDone() && !task.isCancelled();
    }

    public boolean isDone(String id) {
        Future<?> task = taskMap.get(id);
        return task.isDone();
    }

    public boolean isCancelled(String id) {
        Future<?> task = taskMap.get(id);
        return task.isCancelled();
    }

    public boolean cancel(String id) {
        Future<?> task = taskMap.get(id);
        return task.cancel(true);
    }

    public Future<?> forget(String id) {
        return taskMap.remove(id);
    }


    public Future<?> submit(String id, Callable callable) {
        Future<?> task = taskScheduler.submit(callable);
        taskMap.put(id, task);
        return task;
    }
}
