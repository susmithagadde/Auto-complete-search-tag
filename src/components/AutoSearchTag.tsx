import { useState } from 'react';

const Products = [
    'Mobiles',
    'Groceries',
    'Blankets',
    'Furniture',
    'Decorative Lights',
    'Skin Care',
    'Curtains',
    'Cushions'
]

const AutoSearchtag = () => {
    const[searchValue, setSearchValue] = useState<string>('');
    const[selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const[showPopover, setShowPopover] = useState<boolean>(false);
    const onSearchChange = (event: any) => {
        const value = event.target.value;
        if(value){
            setSearchValue(value);
        }
        else{
            setSearchValue('');
        }
    }
    const filterSearchKeys = Products.filter(p => {
        let obj: any = {};
        const splitStr = p.toLowerCase().split("");
        for (let i = 0; i < searchValue.length; i++){
            if(splitStr[i] === searchValue[i].toLowerCase()) {
                obj[p] =  i !== 0 && obj[p] ? true : i === 0 ? true: false;
            }
            else{
                obj[p] = false;
            }
        }
        if(obj[p]) return p
    })
    const onSelectOption = (product: any) => {
        const temp = [...selectedOptions, product]
        setSelectedOptions(temp);
        setShowPopover(false);
        setSearchValue('');
    }
    const onRemoveOption = (option: any) => {
        const temp = selectedOptions
        setSelectedOptions(temp.filter(p => p !== option));
    }
    const InputStyles = {
        'padding': '14px 12px',
        'maxWidth': '540px',
        'height': 'auto',
        'fontSize': '16px',
        'outline': 'none',
        'background': 'none',
        'border': 'none',
        '&:focusVisible': {
            'outline': 'none'
        }
    }
    const onKeyDownChange = () => {
        setShowPopover(true)
    }
    return (
        <div>            
            <div>
            <div className="tag-list"  style={{"display":"flex", "gap": "6px", "flexWrap":"wrap", "width": "540px", "border":"1px solid", "padding": "10px" }}>
                {selectedOptions.length > 0 && selectedOptions.map(option => (
                    <div style={{"display":"flex", "gap": "6px", "alignItems":"center", "border":"1px solid", "justifyContent":"space-between", 'width':'fit-content', 'padding':'5px', 'borderRadius':'6px'}}>
                        <div style={{"fontSize":'14px'}}>{option}</div>
                        <button style={{'padding': "5px", "fontSize": "10px", "borderRadius": "50%",
    "width": "20px",
    "height": "20px",
    "display": "flex",
    "alignItems": "center"}} onClick={() => onRemoveOption(option)}>{'X'}</button>
                    </div>
                ))}
            <input style={InputStyles} type='Search' onKeyDown={onKeyDownChange} value={searchValue} name="searchName" placeholder='Search here' onChange={onSearchChange} />
            </div>
            {showPopover && 
            <div className='search-pop-over' id="searchName">
                {filterSearchKeys.filter(p => !(selectedOptions.includes(p))).length > 0  ? 
                <ul style={{"listStyle":'none', "padding":"10px", "backgroundColor": "rgb(59, 59, 59)", "margin": 0}}>
                {filterSearchKeys.filter(p => !(selectedOptions.includes(p))).map(p => (
                    <li style={{textAlign:'left', cursor:'pointer'}} onClick={() => onSelectOption(p)}>{p}</li>
                ))}
                </ul>
                :
                <div style={{"padding":"10px", "backgroundColor": "rgb(59, 59, 59)"}}>{'No Results Found'}</div>}
            </div>}
            </div>
        </div>
    )
}

export default AutoSearchtag;