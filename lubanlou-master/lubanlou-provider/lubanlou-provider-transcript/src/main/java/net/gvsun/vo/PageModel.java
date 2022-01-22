package net.gvsun.vo;

public class PageModel {

	private int currpage;
	private int pageSize; 
	private int totalRecords;
	
	public PageModel(){
		
	}
	
	public int getCurrpage() {
		return currpage;
	}

	public void setCurrpage(int currpage) {
		this.currpage = currpage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getTotalPage(){
    	return (totalRecords+pageSize-1)/pageSize;
    }
	
    public int getFisrtPage(){
    	return 1;
    }
    
    public int getPreiviousPage(){
    	return currpage<=1?1:currpage-1;
    }
    
    public int getNextPage(){
    	if(currpage>=getTotalPage()){
    		return getLastPage();
    	}
    	
    	return currpage+1;
    }
    
    public int getLastPage(){
    	return getTotalPage()<=0?1:getTotalPage();
    }
}
