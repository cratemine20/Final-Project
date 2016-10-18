import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,Checkbox,Radio,
    Grid,Row,Col,Table, Modal
} from 'react-bootstrap';


class App extends Component {



    state = {
        fname: "",
        lname: "",
        Address: "",
        email: "",
        gender: "",
        numb: "",
        experience: "",
        following: [],
        comment: "",
        records:[],


        show: false,
        afname: "",
        alname: "",
        aAddress: "",
        aemail: "",
        agender: "",
        aphone: "",
        aexperience: "",
        afollowing: [],
        acomment: ""
    };

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


    saveSurvey = ()=> {
        var data = this.state;
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
                location.reload();
                alert("Thank You! Wait for our call!");
            }).catch((error)=> {
              
            });
    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };


/*...................modal code .....................*/
modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };
/*...................modal code .....................*/


    CheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };


/*...................modal code .....................*/
modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.einstructor;
            state[fieldName] = targetArray;
            this.setState(state.einstructor);
        }
    };
/*...................modal code .....................*/

/*...................edit code .....................*/
editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        fname: data.fname,
                        gender: data.gender,
                    })
                }).catch((error)=>{
                    
                });
        };
    };
/*...................edit code .....................*/

/*...................modal code .....................*/
openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        afname: data.fname,
                        alname: data.lname,
                        aAddress: data.Address,
                        aemail: data.email,
                        afollowing: data.following,
                        agender: data.gender,
                        anumb: data.numb,
                        aexperience: data.experience,
                        acomment: data.comment,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.fname);
                }).catch((error)=>{
                    
                });

            };
        };



        openModal1 = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        editthoughts: data.thoughts,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.comment);
                }).catch((error)=>{
                    
                });

            };
        };
/*...................modal code .....................*/


/*...................save edit code .....................*/
 saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {fname: this.state.afname,
                        lname: this.state.alname,
                        Address: this.state.aAddress,
                        email: this.state.aemail,
                        following: this.state.afollowing,
                        gender: this.state.agender,
                        numb: this.state.anumb,
                        experience: this.state.aexperience,
                        comment: this.state.acomment};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                afname: "",
                alname: "",
                aAddress: "",
                aemail: "",
                afollowing: "",
                agender: "",
                anumb: "",
                aexperience: "",
                acomment: "",
                
            });
        }
    };
/*...................save edit code .....................*/







    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button><p/>
                     <Button bsSize="xsmall" bsStyle="primary" onClick={this.openModal(item.id)}>Edit</Button>
                     </td>
                     <td>{item.id}</td>
                     <td>{item.fname}</td>
                     <td>{item.lname}</td>
                     <td>{item.Address}</td>
                     <td>{item.email}</td>
                     <td>{
                         item.following.map((fl, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{fl}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td>{item.gender}</td>
                     <td>{item.numb}</td>
                     <td>{item.experience}</td>
                     <td>{item.comment}</td>
                </tr>
            );
        });

let close = () => this.setState({ show: false })

        return (
            <div className="container">
                <div className="page-header">
                    <h2>JOB HIRING!</h2>
                </div>
                <div className="jumbotron">
               Personal Information
                    <Grid>
                        <Row>
                            <Col>
                            <div className="bform"><br/>
                                <Form>
                                <hr></hr>

                                    <FormGroup> 
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="First Name" value={this.state.fname} onChange={this.onChange('fname')}/><br>
                                        </br><FormControl id="idNo" type="text" placeholder="Last Name" value={this.state.lname} onChange={this.onChange('lname')}/>
                                    </FormGroup>
                                     <FormGroup> 
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="Bohol" value={this.state.Address} onChange={this.onChange('Address')}/>
                                    </FormGroup>
                                    <FormGroup> 
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="abcd@efgh.com" value={this.state.email} onChange={this.onChange('email')}/>
                                    </FormGroup>
                                    <FormGroup> 
                                        <ControlLabel>Gender</ControlLabel>
                                        <FormControl id="idNo" componentClass="select"                                                     
                                                     value={this.state.gender}
                                                     onChange={this.onChange('gender')}
                                            >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup> 
                                        <ControlLabel>Phone</ControlLabel>
                                        <FormControl id="idNo" type="Number" placeholder="Cellphone" value={this.state.numb} onChange={this.onChange('numb')}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Experience</ControlLabel>
                                        <Table className="jTable">
                                          <tr>
                                            <th>  </th>
                                            <th>1 Month-2 Years</th>
                                            <th>2-3 Years</th>
                                            <th>3 Years and Above</th>
                                            <th>None</th>
                                          </tr>
                                          <tr>
                                            <td>&emsp;Job Experience</td>
                                            <td className="t1"><Radio name="c1" value="1 Month-2 Years" onChange={this.onChange('experience')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="2-3 Years" onChange={this.onChange('experience')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="3 Years and Above" onChange={this.onChange('experience')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="None" onChange={this.onChange('experience')}></Radio></td>
                                          </tr>
                                        </Table>
                                        </FormGroup>
                                    <hr></hr>
                                    {/* Check Criteria */}
                                    <FormGroup>
                                        <ControlLabel>Please check if you attended the following:</ControlLabel>
                                        <Checkbox value="Seminar" checked={this.state.following.indexOf('Seminar')>=0 ? true:false} onChange={this.checkboxChange('following')}>
                                           Seminar
                                        </Checkbox>
                                        <Checkbox value="Training" checked={this.state.following.indexOf('Training')>=0 ? true:false} onChange={this.checkboxChange('following')}>
                                          Training
                                        </Checkbox>
                                        <Checkbox value="Workshop" checked={this.state.following.indexOf('Workshop')>=0 ? true:false} onChange={this.checkboxChange('following')}>
                                          Workshop
                                        </Checkbox>                                    
                                    </FormGroup>
                                    <hr></hr>
                                      {/* Rate Instructor */}
                                    
                                        {/* Rate Instructor */}
                                        <ControlLabel>Why did you choose our company?</ControlLabel>
                                    <FormGroup>
                                      <textarea name="comment" value={this.state.comment} onChange={this.onChange('comment')} placeholder="Explain.." className="textarea"/>
                                    </FormGroup>
                                    

                                    <ButtonGroup>

                                        <Button bsStyle="success" onClick={this.saveSurvey}>Send!</Button>
                                        
                                    </ButtonGroup>
                                </Form>
                              </div>{/*End of bform div*/}
                            </Col>



{/* Start Modal Here---------------------------------------------------------------------*/}
<div className="modal-container">
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Resume</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                <hr></hr>

                                    <FormGroup> 
                                        <ControlLabel>Name</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="First Name" value={this.state.afname} onChange={this.onChange('afname')}/><br>
                                        </br><FormControl id="idNo" type="text" placeholder="Last Name" value={this.state.alname} onChange={this.onChange('alname')}/>
                                    </FormGroup>
                                     <FormGroup> 
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="Bohol" value={this.state.aAddress} onChange={this.onChange('aAddress')}/>
                                    </FormGroup>
                                    <FormGroup> 
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl id="idNo" type="text" placeholder="abcd@efgh.com" value={this.state.aemail} onChange={this.onChange('aemail')}/>
                                    </FormGroup>
                                    <FormGroup> 
                                        <ControlLabel>Gender</ControlLabel>
                                        <FormControl id="idNo" componentClass="select"                                                     
                                                     value={this.state.agender}
                                                     onChange={this.onChange('agender')}
                                            >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup> 
                                        <ControlLabel>Phone</ControlLabel>
                                        <FormControl id="idNo" type="Number" placeholder="Cellphone" value={this.state.anumb} onChange={this.onChange('anumb')}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Experience</ControlLabel>
                                        <Table className="jTable">
                                          <tr>
                                            <th>  </th>
                                            <th>1 Month-2 Years</th>
                                            <th>2-3 Years</th>
                                            <th>3 Years and Above</th>
                                            <th>None</th>
                                          </tr>
                                          <tr>
                                            <td>&emsp;Job Experience</td>
                                            <td className="t1"><Radio name="c1" value="1 Month-2 Years" checked={this.state.aexperience == "1 Month-2 Years" ? true : false} onChange={this.onChange('aexperience')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="2-3 Years" checked={this.state.aexperience == "2-3 Years" ? true : false} onChange={this.onChange('aexperience')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="3 Years and Above" checked={this.state.aexperience == "3 Years and Above" ? true : false} onChange={this.onChange('aexperience')}></Radio></td>
                                            <td className="t1"><Radio name="c1" value="None" checked={this.state.aexperience == "None" ? true : false} onChange={this.onChange('aexperience')}></Radio></td>
                                          </tr>
                                        </Table>
                                        </FormGroup>
                                    <hr></hr>
                                    {/* Check Criteria */}
                                    <FormGroup>
                                        <ControlLabel>Please check if you attended the following:</ControlLabel>
                                        <Checkbox value="1" checked={this.state.afollowing.indexOf('1')>=0 ? true:false} onChange={this.checkboxChange('afollowing')}>
                                           Seminar
                                        </Checkbox>
                                        <Checkbox value="2" checked={this.state.afollowing.indexOf('2')>=0 ? true:false} onChange={this.checkboxChange('afollowing')}>
                                          Training
                                        </Checkbox>
                                        <Checkbox value="3" checked={this.state.afollowing.indexOf('3')>=0 ? true:false} onChange={this.checkboxChange('afollowing')}>
                                          Workshop
                                        </Checkbox>                                    
                                    </FormGroup>
                                    <hr></hr>
                                      {/* Rate Instructor */}
                                    
                                        {/* Rate Instructor */}
                                        <ControlLabel>Why did you choose our company?</ControlLabel>
                                    <FormGroup>
                                      <textarea name="comment" value={this.state.acomment} onChange={this.onChange('acomment')} placeholder="Explain.." className="textarea"/>
                                    </FormGroup>
                                    

                                    <ButtonGroup>
                                    
                                        <Button  bsStyle="success" onClick={this.saveEdit(this.state.selectedId)}>Save Changes</Button>

                                    </ButtonGroup>
                                </Form>
</Modal.Body>
                        </Modal>
                        </div>




{/* ..............................................................................M O D A L..............................................................................*/}











                            <hr className="thr"></hr>
                            <h3>Feedback List</h3>
                                <Table condensed striped bordered hover className="survey_list">
                                    <thead>
                                    <tr>
                                       <th>Action</th>
                                       <th>Entry Number</th> 
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th>Attended</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Experience</th>
                                        <th>Reason</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                            
                        </Row>
                    </Grid>

                </div>
            </div>
        );
    }
}

export default App;
