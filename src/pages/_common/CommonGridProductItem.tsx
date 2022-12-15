import React, { FC } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Chart from '../../components/extras/Chart';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Badge from '../../components/bootstrap/Badge';
import { priceFormat } from '../../helpers/helpers';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import { demoPagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';

interface ICommonGridProductItemProps {
	id: string | number;
	name: string;
	category: string;
	img: string;
	color: string;
	series: ApexOptions['series'];
	price: number;
	editAction: any;
	deleteAction: any;
}
const CommonGridProductItem: FC<ICommonGridProductItemProps> = ({
	id,
	name,
	category,
	img,
	color,
	series,
	price,
	editAction,
	deleteAction,
}) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	const dummyOptions: ApexOptions = {
		colors: [color],
		chart: {
			type: 'line',
			width: 100,
			height: 35,
			sparkline: {
				enabled: true,
			},
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false,
			},
			x: {
				show: false,
			},
			y: {
				title: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					formatter(seriesName: string) {
						return '';
					},
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
	};
	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle>
						{'Supplier'}
						
					</CardTitle>
					<CardSubTitle>


					<h5>CDP Fastener Group, Inc.</h5>
					<h5>Release: 349</h5>
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button icon='MoreHoriz' color={themeStatus} shadow='default' />
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button icon='Edit' onClick={() => editAction()}>
									Edit
								</Button>
							</DropdownItem>
							<DropdownItem>
								<Button icon='Delete' onClick={() => deleteAction()}>
									Delete
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody>
				
				<div className='row compliance-list'>
					<div className='col-md-12 compliance-item'><Icon icon={'Check'} className='h4 compliance-icon' color='success'/><strong>SCAC</strong> Compliance</div>
					<div className='col-md-12 compliance-item'><Icon icon={'Warning'} className='h4 compliance-icon' color='warning'/><strong>SHIP</strong> Compliance</div>
					<div className='col-md-12 compliance-item'><Icon icon={'Check'} className='h4 compliance-icon' color='success'/><strong>PRICE</strong> Compliance</div>
					<div className='col-md-12 compliance-item'><Icon icon={'Check'} className='h4 compliance-icon' color='success'/><strong>QUANTITY</strong> Compliance</div>
					<div className='col-md-12 compliance-item'><Icon icon={'Check'} className='h4 compliance-icon' color='success'/><strong>TRACKING</strong> Compliance</div>

				</div>
			</CardBody>
			<CardFooter className='shadow-3d-container'>
				<Button
					color='primary'
					className={`w-100 mb-4 shadow-3d-up-hover shadow-3d-${
						darkModeStatus ? 'light' : 'dark'
					}`}
					size='lg'
					tag='a'
					to={`../${demoPagesMenu.sales.subMenu.productID.path}/${id}`}>
					View Report
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CommonGridProductItem;
