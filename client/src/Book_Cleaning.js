import './css/Book_Cleaning.css';
// Bootstrap
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
// Material UI

// Syncfusion
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

function Book_Cleaning() {
    const clickDate = (value) => {
        console.log(value)
    }
    return (
        <>
            <div>
                <div style={{ padding: '30px' }}>
                    <div>
                        <div className="col-md-4">
                            <DateTimePickerComponent></DateTimePickerComponent>
                        </div>

                        <div className='mt-4'>
                            <Card>
                                <div>
                                    Hello
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Book_Cleaning;