import React from 'react';

class Item extends React.Component {
  render() {
    const { task, onToggle, onDelete } = this.props;

    return (
      <div key={task.id} className="list-group-item item">
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={e => onToggle(e, task.id)}
              checked={task.done}
            />
          </div>
          {task.text}
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}
export default Item;
