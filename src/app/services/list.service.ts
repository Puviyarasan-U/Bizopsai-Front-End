import { Injectable } from '@angular/core';

export class List {
	Img: any;
	Tittle: string;
	Price: string;
	Count: string;
	Location: string;
	County: string;
	catgy: any;
	subcatgy: any;
	Category: string;
	Description: string;
	Id: any;
	Type: string;
	Text: string;
	Coordinates: any;
	verified: boolean;

}

const list_new: List[] = [{
	'Img': '/assets/img/road_tr.jpg',
	'Tittle': 'BUSINESS',
	'Price': '10 Million',
	'Count': '50',
	'Location': 'Alaska',
	'County' : 'Aleutians East Borough',
	'catgy' : 'Construction',
	'subcatgy': 'Architect',
	'Category': 'store',
	'Description': 'The management firm was established in 1995 with a vision to become a pioneer Information based service provider for Joint Ventures, Strategic Alliance, Global Marketing, to capture global opportunities, etc. for Small and Medium Enterprises in India. The firm has expertise to work with SMEs and create global opportunities for them. The firm has worked with various large and small Indian and foreign companies from various industrial sectors. Last year\'s turnover was INR 25 Lacs and the profit was INR 5 Lacs. The asking price of the business is INR 25 Lacs.',
	'Id': 'SDC01254',
	'Type': 'Full Sale',
	'Text': 'The management firm was established in 1995 with a vision to become a pioneer Information based service provider for Joint Ventures, Strategic Alliance, Global Marketing, to capture global opportunities, etc.',
	'Coordinates': [37.869260, -122.254811],
	'verified': false
}, {
	'Img': '/assets/img/road_tr.png',
	'Tittle': 'SPORTS SHOP',
	'Price': '15 Million',
	'Count': '5 Million',
	'Location': 'Texas',
	'County' : 'Anderson',
	'catgy' : 'Construction',
	'subcatgy': 'Architect',
	'Category': 'shop',
	'Description': 'Reputed sportswear company is looking for dealers all across India. This punjab based company is engaged in producing high quality, high ranged sports wears and about to launch their own sportswear brand in near future. The company is interested in appointing Dealers across the country.',
	'Id': 'SDC01460',
	'Type': 'Contract',
	'Text': 'Reputed sportswear company is looking for dealers all across India. This company is engaged in producing high quality, high ranged sports wears and about to launch their own sportswear brand in near future.',
	'Coordinates': [37.869260, -122.254811],
	'verified': true
},
{
	'Img': '/assets/img/audit.jpg',
	'Tittle': ' RESTAURENT',
	'Price': '68 Million',
	'Count': '100',
	'Location': 'Alaska',
	'County' : 'Municipality of Anchorage',
	'catgy' : 'Construction',
	'subcatgy': 'Landscape',
	'Category': 'food',
	'Description': 'The profitable restaurant started in the year 2015. The restaurant has two outlets both different location in Dehradun. Both the premise is well furnished with latest kitchen equipment. Daily average sells in the restaurant is INR 70,000. The Resturant premise is on lease and monthly rent is INR 1.05 for both the location. Area size for one premise is 2500 Sq ft and for another premise, it\'s 600 Sq ft. The business is running right now, it is Sole Proprietorship company.',
	'Id': 'TYD08510',
	'Type': 'Full Sale',
	'Text': 'The profitable restaurant started in the year 2015. The restaurant has two outlets both different location in Dehradun. Both the premise is well furnished with latest kitchen equipment.Daily average sells in the restaurant is INR 70,000.',
	'Coordinates': [37.869260, -122.254811],
	'verified': true
},

{
	'Img': '/assets/img/au.png',
	'Tittle': 'SEEK & BUY',
	'Price': '70 Million',
	'Count': '50',
	'Location': 'Florida',
	'County': 'Baker',
	'catgy' : 'Real Estate',
	'subcatgy': 'Commercial',
	'Category': 'Textile',
	'Description': 'The well-established retail outlet started in 2001 in a market near Sohna road, Florida. A textile studio committed to bringing Indian folk, fabrics designs, and handiwork into mainstream fashion. Indian folk motifs as the face of Indian Fashion. The store is popular for designer clothes. The premise is renovated in August 2016 with all new furniture. The shop has stock of INR 25 Lacs, stitching machines, and other amenities. Monthly turnover is between 2-3 Lacs. The area size of a premise is 450 Sq Ft and market value of the premise is between INR 18,000 to 20,000 per Sq Ft. Asking price is INR 35 Lacs {Exculding Land}.',
	'Id': 'SAB01760',
	'Type': 'Full Sale',
	'Text': 'The well-established retail outlet started in 2001 in a market near Sohna road, Florida. A textile studio committed to bringing Indian folk, fabrics designs, and handiwork into mainstream fashion.',
	'Coordinates': [37.869260, -122.254811],
	'verified': false
},
{
	'Img': '/assets/img/road.jpg',
	'Tittle': 'FACTORY OUTLET STORE',
	'Price': '50 Million',
	'Count': '50',
	'Location': 'New York',
	'County': 'Bronx',
	'catgy' : 'Real Estate',
	'subcatgy': 'Residential',
	'Category': 'Textile',
	'Description': 'The well-established retail outlet started in 2001 in a market near Sohna road, Gurgaon. A textile studio committed to bringing Indian folk, fabrics designs, and handiwork into mainstream fashion. Indian folk motifs as the face of Indian Fashion. The store is popular for designer clothes. The premise is renovated in August 2016 with all new furniture. The shop has stock of INR 25 Lacs, stitching machines, and other amenities.',
	'Id': 'SAC01750',
	'Type': 'Full Sale',
	'Text': ' A textile studio committed to bringing Indian folk, fabrics designs, and handiwork into mainstream fashion. Indian folk motifs as the face of Indian Fashion.',
	'Coordinates': [37.869260, -122.254811],
	'verified': true
},
{
	'Img': '/assets/img/audit1.png',
	'Tittle': 'STEAM PUB & RESTAURENT',
	'Price': '63 Million',
	'Count': '50',
	'Location': 'New York',
	'County': 'Allegany',
	'catgy' : 'Information Technology',
	'subcatgy': 'Software development',
	'Category': 'food',
	'Description': 'The profitable restaurant started in the year 2015. The restaurant has two outlets both different location in Dehradun. Both the premise is well furnished with latest kitchen equipment. Daily average sells in the restaurant is INR 70,000. The Resturant premise is on lease and monthly rent is INR 1.05 for both the location. Area size for one premise is 2500 Sq ft and for another premise, it\'s 600 Sq ft. The business is running right now, it is Sole Proprietorship company.',
	'Id': 'TYD08510',
	'Type': 'Full Sale',
	'Text': 'The profitable restaurant started in the year 2015. The restaurant has two outlets both different location in Dehradun. Both the premise is well furnished with latest kitchen equipment.',
	'Coordinates': [37.869260, -122.254811],
	'verified': false
},
// {
// 	'Img': '/assets/img/road_tr.jpg',
// 	'Tittle': 'SOFTWARE DEVELOPMENT',
// 	'Price': '50 Million',
// 	'Count': '85 Million',
// 	'Location': 'New York',
// 	'County':'Allegany',
// 	'catgy' :'Information Technology',
// 	'subcatgy':'Cybersecurity',
// 	'Category': 'Textile',
// 	'Description': 'A Private limited software and web development business is looking for an exit in Pune. The business has been running since 2000 with 6 employees in the business. They provide customized software along with product based software to hotel and hospitality industries. They have ERP solutions for the manufacturing, inventory control and logistics industries based business. The business has served to clients based in India as well as based out of India. For a US based client, they designed a jewelry portal. ',
// 	'Id': 'TYD07510',
// 	'Type': 'Full Sale',
// 	'Text': 'A Private limited software and web development business is looking for an exit in Pune. The business has been running since 2000 with 6 employees in the business.',
// 	'Coordinates': [37.869260, -122.254811],
// 	'verified':false
// }
];

@Injectable()
export class ListService {
	getList() {
		return list_new.map(d => {
			return d;
		});
	}
}
