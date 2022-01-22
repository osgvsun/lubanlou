package net.gvsun.config;

import net.gvsun.datasource.DatasourceChangeListener;
import net.gvsun.service.datasource.InvalidCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DatasourceChange implements DatasourceChangeListener {
    private final InvalidCacheService invalidCacheService;

    @Autowired
    public DatasourceChange(InvalidCacheService invalidCacheService) {
        this.invalidCacheService = invalidCacheService;
    }

    @Override
    public void afterDatasourceRefresh() {
        invalidCacheService.all();
    }
}
