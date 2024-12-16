/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Radio,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories } from "../../store/actions/productActions";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="#9E9E9E"
      className={`${
        id === open ? "rotate-180" : ""
      } h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function List({ category, isSelected, onSelect }) {
  return (
    <div className="flex !justify-between items-center">
      <Radio
        className="hover:before:opacity-0"
        checked={isSelected}
        onChange={() => onSelect(category)}
        ripple={false}
        label={
          <Typography variant="small" color="blue-gray" className="font-medium">
            {category}
          </Typography>
        }
        containerProps={{
          className: "-ml-3 py-2",
        }}
      />
    </div>
  );
}

function Filters() {
  const [open, setOpen] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState([50, 30000]);
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    let url = "/products";
    const queryParams = [];

    if (keyword.trim())
      queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
    if (selectedCategory)
      queryParams.push(`category=${encodeURIComponent(selectedCategory)}`);

    queryParams.push(`min=${encodeURIComponent(price[0])}`);
    queryParams.push(`max=${encodeURIComponent(price[1])}`);
    queryParams.push(`ratings=${encodeURIComponent(ratings)}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    navigate(url);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClearAll = () => {
    setSelectedCategory("");
    setKeyword("");
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <div className="flex w-full items-center justify-center gap-5 my-5">
      <div>
        <div className="relative">
          <form onSubmit={handleSearchSubmit}>
            <input
              className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Laptops, Aipods ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="bg-black absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom-start"
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <Button>Filters</Button>
        </MenuHandler>
        <MenuList className="!w-72">
          <div className="p-2 mb-2" onClick={handleClearAll}>
            <div className="outline-none flex gap-10 justify-end">
              <button className="text-gray-900 font-medium">Clear All</button>
            </div>
          </div>
          <MenuItem>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="py-0 !border-0"
              >
                <Typography
                  variant="small"
                  className="font-medium text-gray-600"
                >
                  Categories
                </Typography>
              </AccordionHeader>
              <AccordionBody className="!py-1 px-0.5">
                {categories.map((category, key) => (
                  <List
                    key={key}
                    category={category}
                    isSelected={selectedCategory === category}
                    onSelect={handleCategorySelect}
                  />
                ))}
              </AccordionBody>
            </Accordion>
          </MenuItem>
          <MenuItem>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="py-0 !border-0"
              >
                <Typography
                  variant="small"
                  className="font-medium text-gray-600"
                >
                  Price
                </Typography>
              </AccordionHeader>
              <AccordionBody>
                <Box
                  sx={{ height: 75, padding: 2 }}
                  className="flex items-center justify-center"
                >
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    color="black"
                    min={50}
                    max={30000}
                  />
                </Box>
              </AccordionBody>
            </Accordion>
          </MenuItem>
          <MenuItem>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="py-0 !border-0"
              >
                <Typography
                  variant="small"
                  className="font-medium text-gray-600"
                >
                  Ratings Above
                </Typography>
              </AccordionHeader>
              <AccordionBody>
                <Box
                  sx={{ height: 75, padding: 2 }}
                  className="flex items-center justify-center"
                >
                  <Slider
                    aria-label="Ratings"
                    valueLabelDisplay="auto"
                    min={1}
                    max={5}
                    value={ratings}
                    onChange={(e, newRating) => setRatings(newRating)}
                    color="black"
                  />
                </Box>
              </AccordionBody>
            </Accordion>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Filters;
