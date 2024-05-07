import {useHttp} from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { filteredHeroes, activeFilterChanged } from "../../actions";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active


const HeroesFilters = () => {

	const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
	const dispatch = useDispatch();
	const {request} = useHttp();

	// Запрос на сервер для получения фильтров и последовательной смены состояния
	useEffect(() => {
		dispatch(filteredHeroes(request))
		// eslint-disable-next-line
	}, []);

	if (filtersLoadingStatus === 'loading') {
		return <Spinner />
	} else if (filtersLoadingStatus === 'error') {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>
	}

	const renderFilters = (arr) => {
		if (arr.length === 0) {
			return <h5 className='text-center mt-5'>Фильтры не найдены</h5>
		}

		// Расширенные данные в json-файле с классами и текстом
		return arr.map(({name, className, label}) => {

			// Использование библиотеки classnames и формирование классов динамически
			const btnClass = classNames('btn', className, {
				'active': name === activeFilter
			});

			return <button
				key={name}
				id={name}
				className={btnClass}
				onClick={() => dispatch(activeFilterChanged(name))}
			>
				{label}
			</button>
		})
	}

	const element = renderFilters(filters);

	return (
		<div className='card shadow-lg mt-4'>
			<div className='card-body'>
				<p className='card-text'>Фильтр героев по элементам</p>
				<div className='btn-group'>
					{element}
				</div>
			</div>
		</div>
	);
}

export default HeroesFilters;