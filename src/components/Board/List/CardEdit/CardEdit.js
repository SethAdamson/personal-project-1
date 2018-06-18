import React from 'react';
import './CardEdit.css';
import FontAwesome from 'react-fontawesome';

export default function CardEdit(props) {
    let {board_id, editDesc, editTitle, editID, handleBoard, cancelCardEdit, stopPropCard, editLocation, removeCard} = props;
    return (
        <div className='edit-card' onClick={cancelCardEdit}> 
            <section className='edit-content' onClick={(e) => stopPropCard(e)}>
                <div className='edit-title'>
                    <FontAwesome className='cardedit-exit'  name='far fa-times fa-lg' onClick={cancelCardEdit}/>
                    <h1 className='cardedit-title'>{editTitle}</h1>
                    <h3 className='cardedit-location'>{editLocation.list_title}</h3>
                </div> 
                <div className='description'>
                    {editDesc ? 
                        {editDesc}
                    :
                        <input name='newDesc' className='new-desc' onChange={handleBoard} />      
                    }
                </div>
                <div className='cardedit-delete' onClick={() => removeCard(board_id, editID)}>
                    <h3 className='cardedit-delete-title'>Remove Card</h3>
                    <FontAwesome className='cardedit-trash'  name='far fa-trash-alt fa-lg' />
                </div> 
            </section>
        </div>
    )
}