package net.gvsun.service;

import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.entity.Statistic;
import net.gvsun.repository.StatisticRepository;
import net.gvsun.service.datasource.DatasourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class LoginStatisticService {
    private final StatisticRepository statisticRepository;
    ExecutorService executorService = Executors.newFixedThreadPool(40);

    @Autowired
    public LoginStatisticService(StatisticRepository statisticRepository) {
        this.statisticRepository = statisticRepository;
    }

    public void stat(DatasourceService.LoginType loginType, String s) {
        executorService.submit(() -> {
            String database = ClientDatabaseContextHolder.getClientDatabase();
            Statistic statistic = new Statistic();
            statistic.setDatasource(database);
            statistic.setDatetime(new Date());
            statistic.setLoginType(loginType.toString());
            statistic.setUserIdentification(s);
            ClientDatabaseContextHolder.set(null);
            statisticRepository.saveAndFlush(statistic);
            ClientDatabaseContextHolder.set(database);
        });
    }
}
