
const Row = ({account_name,available_cash,prev_change}) => (
  <div className="row">
    <div className="account">{account_name}</div>
    <div>
      <span>{new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2 
}).format(available_cash)}</span>
      <span className={available_cash-prev_change>0?'green':'red'}>{new Intl.NumberFormat('en-US', { 
          style:'percent',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2 
}).format((available_cash-prev_change)/prev_change)} / 
        {new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2 
}).format(prev_change)}</span>
    </div>   
  </div>
);

/*
  Table component written as an ES6 class
*/
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [
        {account_name: 'IRA - 5200', available_cash: 5763.36,prev_change:8916.69 }, 
        {account_name: 'AAA - 1812', available_cash: 40000.10,prev_change:38881.63}, 
        {account_name: 'AAA - 3810', available_cash: 10050.07,prev_change:8916.69},
        {account_name: 'IRA - 5201', available_cash: 5763.36,prev_change:8916.69 }, 
        {account_name: 'AAA - 1813', available_cash: 40000.10,prev_change:38881.63}, 
        {account_name: 'AAA - 3814', available_cash: 10050.07,prev_change:8916.69},
        {account_name: 'IRA - 5202', available_cash: 5763.36,prev_change:8916.69 }, 
        {account_name: 'AAA - 1814', available_cash: 40000.10,prev_change:38881.63}, 
        {account_name: 'AAA - 3815', available_cash: 10050.07,prev_change:8916.69},
        {account_name: 'IRA - 5203', available_cash: 5763.36,prev_change:8916.69 }, 
        {account_name: 'AAA - 1816', available_cash: 40000.10,prev_change:38881.63}, 
        {account_name: 'AAA - 38101', available_cash: 10050.07,prev_change:8916.69},
        {account_name: 'IRA - 5209', available_cash: 5763.36,prev_change:8916.69 }, 
        {account_name: 'AAA - 1818', available_cash: 40000.10,prev_change:38881.63}, 
        {account_name: 'AAA - 3817', available_cash: 10050.07,prev_change:8916.69},
      ],
      data:[
        {account_name: 'IRA - 5200', available_cash: 5763.36,prev_change:8916.69 }, 
        {account_name: 'AAA - 1812', available_cash: 40000.10,prev_change:38881.63}, 
        {account_name: 'AAA - 3810', available_cash: 10050.07,prev_change:8916.69},],
      asc:true,
    };
    
    // http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
    // bind the context for compareBy & sortBy to this component instance
    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.sortBy('account_name',"asc");
  }
  
  compareBy(key,order) {
    return function (a, b) {
      if(order=='asc'){
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
      }
      if(order=='desc'){
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
      }
      
    };
  }
  sortBy(key,order) {
    let arrayCopy = [...this.state.fullData];
    arrayCopy.sort(this.compareBy(key,order));
    let asc= this.state.asc;
    
        this.setState({asc:!asc});
    let data = this.state.data;
    
    this.setState({fullData: arrayCopy});
    this.setState({data: arrayCopy.slice(0,data.length)});
  }
  
   loadMore() {
     console.log("Entered loadmore");
    let fullData = [...this.state.fullData];
     let data = this.state.data;
     let newData = data.concat(fullData.slice(data.length, data.length+3));
    this.setState({ data: newData});
  }
    
  render() {
    const rows = this.state.data.map( (rowData) => 
                                     
                                     <Row {...rowData } />
                                    );

    return (
      <div className="table">
        <div className="header">
          <div onClick={() => this.state.asc?this.sortBy('account_name',"asc"):this.sortBy('account_name',"desc")} >Account</div>
          <div onClick={() => this.state.asc?this.sortBy('available_cash',"asc"):this.sortBy('available_cash',"desc")}>
          <span>Available Cash</span>
             <span className="todays_change">Today's Change</span>
          </div>
        </div>
        <div className="body">
          {rows}
          <button onClick={() => this.loadMore()}>Load more</button>
        </div>
      </div>
    );
    
  }
}

/*
 * Render the above component into the div#app
 */
ReactDOM.render(<Table />, document.getElementById('app'));