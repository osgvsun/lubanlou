package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

public class DictionaryDTO extends Recordable implements Shared {

    private String code;
    private String Name;
    private String Table;
    private String Column;
    private String dictionary;
    private String dictionaryName;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getTable() {
        return Table;
    }

    public void setTable(String table) {
        Table = table;
    }

    public String getColumn() {
        return Column;
    }

    public void setColumn(String column) {
        Column = column;
    }

    public String getDictionary() {
        return dictionary;
    }

    public void setDictionary(String dictionary) {
        this.dictionary = dictionary;
    }

    public String getDictionaryName() {
        return dictionaryName;
    }

    public void setDictionaryName(String dictionaryName) {
        this.dictionaryName = dictionaryName;
    }
}
