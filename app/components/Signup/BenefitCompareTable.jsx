import React from 'react';
import { PROFESSIONAL_BENEFITS_COMPARISION } from '../../common/Constants';
import './Signup.scss';

export const BenefitCompareTable = () => (
    <div className="tablewrap">
        <table >
            <tbody>
                <tr>
                    <th />
                    <th style={{ backgroundColor: '#e6e6e6', textAlign: 'center' }}>Overstock</th>
                    <th
                        className="arrowColHead"
                        style={{
                            width: '100px',
                            backgroundColor: '#034078',
                            color: 'white',
                            textAlign: 'center',
                             borderBottomColor: '#034078  ',
                        }}>
Overstock Professional
                    </th>
                </tr>
                {PROFESSIONAL_BENEFITS_COMPARISION && PROFESSIONAL_BENEFITS_COMPARISION.map(Obj => (
                    <tr key={Obj.id}>
                        <td style={Obj.id === 1 ? { paddingTop: '40px' } : {}}>{Obj.value}</td>
                        <td className="tick" style={Obj.id === 1 ? { textAlign: 'center', paddingTop: '40px' } : { textAlign: 'center' }} />
                        <td className="tick1" style={Obj.id === 1 ? { textAlign: 'center', paddingTop: '40px' } : { textAlign: 'center' }} />
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default BenefitCompareTable;
