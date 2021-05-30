import React from 'react'
import './App.css'
import axios from 'axios'

class App extends React.Component{
    state = {meds:[]}

    addFields = (e) => {
        e.preventDefault()
        this.setState({meds: [...this.state.meds, {name: "", qnty: null, rate: null, total: null}]})
    }

    updateName = (index, e) => {
        this.setState({meds: this.state.meds.map((item, j) => {
            if (j == index){
                const container = {}
                container.name = e.target.value
                container.qnty = item.qnty
                return container
            }
            else{
                return item
            }
        })})
    }

    updateQnty = (index, e) => {
        this.setState({meds: this.state.meds.map((item, j) => {
            if (j == index){
                const container = {}
                container.name = item.name
                container.qnty = e.target.value
                container.rate = item.rate
                container.total = e.target.value * item.rate
                return container
            }
            else{
                return item
            }
        })})
    }

    updateRate = (index, e) => {
        this.setState({meds: this.state.meds.map((item, j) => {
            if (j == index){
                const container = {}
                container.name = item.name
                container.qnty = item.qnty
                container.rate = e.target.value
                container.total = e.target.value * item.qnty
                return container
            }
            else{
                return item
            }
        })})
    }

    removeItem = (index, e) => {
        e.preventDefault()
        this.state.meds.splice(index, 1)
        //console.log(this.state.meds)
        this.setState({meds: this.state.meds})
    }

    handleSubmit = async(e) => {
        e.preventDefault()
        let finalList = []
        for (let i in this.state.meds){
            let container = {}
            container.name = this.state.meds[i].name
            container.qnty = this.state.meds[i].qnty
            finalList.push(container)
        }
        try{
            const response = await axios.post('http://13.233.69.75:8000/shop/offlinereq/', {
                'meds': finalList, 'owner': "david@gmail.com",
            })
            alert(response.data)
        }
        catch(err){
            alert('Unable to update stock')
        }
        console.log(finalList)
    }

    render(){
            const RenderedList = this.state.meds.map((meds, index) => {
            return(
                <tr>
                    <td><a class="cut" onClick={(e) => this.removeItem(index, e)}>-</a><input value={this.state.meds[index].name} type="text" name="MEDNAME" placeholder="Medicine Name" onChange={(e)=>this.updateName(index, e)}/></td>
                    <td><input value={this.state.meds[index].rate} type="text" name="MEDRATE" placeholder="Medicine Rate" onChange={(e)=>this.updateRate(index, e)}/></td>
                    <td><input className="stock_update_input" value={this.state.meds[index].qnty} type="text" name="MEDQNTY" placeholder="Quantity" onChange={(e)=>this.updateQnty(index, e)}/></td>
                    <td><span>{this.state.meds[index].total}</span></td>
                </tr> 
            )
        })
        return(
            <div>
                <header>
			<h1>MEDICO</h1>
			<address>
				<p>Amit Medical Store</p>
				<p>Sector 4<br />Gurugram, Haryana(122001)</p>
				<p>(91) 1234567890</p>
			</address>
			<span><img alt="" src="http://www.jonathantneal.com/examples/invoice/logo.png" /><input type="file" accept="image/*" /></span>
		</header>
		<article>
			<h1>Recipient</h1>
			<address>
				<p>Gaurav Khanna</p>
			</address>
			<table class="meta">
				<tr>
					<th><span>Invoice #</span></th>
					<td><span>101138</span></td>
				</tr>
				<tr>
					<th><span>Date</span></th>
					<td><span>May 30, 2021</span></td>
				</tr>
			</table>
			<table class="inventory">
				<thead>
					<tr>
						<th><span>Item</span></th>
						
						<th><span>Rate</span></th>
						<th><span>Quantity</span></th>
						<th><span>Price</span></th>
					</tr>
				</thead>
				<tbody>
					{RenderedList}
				</tbody>
			</table>
			<a className="add" onClick={(e)=>this.addFields(e)}>+</a>
		</article>
        <div style={{'textAlign' : 'center'}}>
        <button className='btn btn-danger' style={{'marginLeft': '10px'}}>Cancel</button>
        <button className='btn btn-primary' style={{'marginLeft': '10px'}} onClick={(e) => this.handleSubmit(e)}>Make Payment</button>
        </div>
        <br />
		<aside>
			<h1><span>Additional Notes</span></h1>
		</aside>
            </div>
        )
    }
}

export default App