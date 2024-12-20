import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { setSortOrder } from './Slice';

export function Dropdowns() {
  const dispatch = useDispatch();

  const handleSort = (order) => {
    dispatch(setSortOrder(order));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSort('A-Z')}>A-Z</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort('Z-A')}>Z-A</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
