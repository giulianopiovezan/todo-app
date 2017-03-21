import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {

    const keyHandler = (e) => {
        if(e.key === 'Enter'){
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        }else if (e.key === 'Escape'){
            props.handleReset();
        }
    }

    return(
        <div role="form" className="todoForm">
            <Grid cols="12 9 10">
                <input autoFocus id="description" className="form-control"
                    placeholder="Adicione uma tarefa"
                    value={props.description} 
                    onChange={props.handleChange}
                    onKeyUp={keyHandler} />
            </Grid>

            <Grid cols="12 3 2">
                <IconButton style="primary" icon="plus"
                    onClick={props.handleAdd}>
                </IconButton>
                <IconButton style='info' icon='search'
                    onClick={props.handleSearch}>
                </IconButton>
                <IconButton style='defaul' icon='close'
                    onClick={props.handleReset}>
                </IconButton>
            </Grid>
        </div>
    )
}