import React, { Component } from 'react';
import './FooterDetail.scss';
import {
    Grid, Row, Col, Button,
} from 'react-bootstrap';
import {
    Events, animateScroll as scroll, scrollSpy,
} from 'react-scroll';
import ShopSocial from './ShopSocial';
import {
    GOV_BUYER_TEXT,
    ABOUT_RIGHTS, ABOUT_FEDERAL_CUSTOMERS,
    PROFESSIONAL_BENEFITS, WHY_OPROFESSIONAL,
    MIN_SPENDING_REQUIREMENT,
    GOVT_REQUIREMENT, SMALL_BUSINESS_INFO
} from '../../common/Constants';

class FooterDetail extends Component {
    componentDidMount () {
        Events.scrollEvent.register('begin');

        Events.scrollEvent.register('end');
        scrollSpy.update();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    designer() {
        scroll.scrollMore(1900);
    }

    government() {
        scroll.scrollMore(2950);
    }

    corporate() {
        scroll.scrollMore(5050);
    }

    business() {
        scroll.scrollMore(6050);
    }

    render() {
        return (
            <div className="mainContentWrap">
                <Grid>
                    <section className="iconFullWrap">
                        <Row>
                            <Col sm={6} md={3}>
                                <div className="iconBoxWrap">
                                    <span className="iconBox"> icon </span>
                                    <a onClick={this.designer}>
                                    Designer
                                        <span className="arrowdown">
                                            <i className="fa fa-angle-down" aria-hidden="true" />
                                        </span>
                                    </a>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="iconBoxWrap">
                                    <span className="iconBox"> icon </span>
                                    <a onClick={this.government}>
                                    Government
                                        <span className="arrowdown">
                                            <i className="fa fa-angle-down" aria-hidden="true" />
                                        </span>
                                    </a>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="iconBoxWrap">
                                    <span className="iconBox"> icon </span>
                                    <a onClick={this.corporate}>
                                    Corporate
                                        <span className="arrowdown">
                                            <i className="fa fa-angle-down" aria-hidden="true" />
                                        </span>
                                    </a>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="iconBoxWrap">
                                    <span className="iconBox"> icon </span>
                                    <a onClick={this.business}>
                                    Small Business
                                        <span className="arrowdown">
                                            <i className="fa fa-angle-down" aria-hidden="true" />
                                        </span>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </section>
                    <Row>
                        <Col sm={12} md={6}>
                            <div className="specialBuy">
                                <h1 className="titleBox_1">
                                    SPECIAL BUY OF THE WEEK
                                    <span>Free Shipping</span>
                                </h1>
                                <a href="/signin" className="linkStyle_1">
                                    Shop Now
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                </a>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className="specialBuy">
                                <h1 className="titleBox_1">
                                    BULK ORDER DEALS
                                    <span>Discounts</span>
                                </h1>
                                <a href="/signin" className="linkStyle_1">
                                    See Offers
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <section className="ProfBenefitsBase">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1"> Professional Benefits & Services </h3>
                            </Col>
                            <Col sm={12} md={5}>
                                <div className="ProfBenefitsPoints">
                                    <h3><b>Save Time & Money</b></h3>
                                    <ul>
                                        {PROFESSIONAL_BENEFITS && PROFESSIONAL_BENEFITS.map(benefit => <li key={benefit.id}>{benefit.value}</li>)}
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={12} md={7}>
                                <div className="ProfBenefitsBox"> image </div>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase">
                        <Row>
                            <Col sm={12} md={4} className="textLeftAlign">
                                <div className="boxOutsideWrap">
                                    <span className="box1">icon </span>
                                    <figcaption>Key Features </figcaption>
                                </div>
                            </Col>
                            <Col sm={12} md={4} className="textCenterAlign">
                                <div className="boxOutsideWrap">
                                    <span className="box1">icon </span>
                                    <figcaption>Key Features </figcaption>
                                </div>
                            </Col>
                            <Col sm={12} md={4} className="textRightAlign">
                                <div className="boxOutsideWrap">
                                    <span className="box1">icon </span>
                                    <figcaption>Key Features </figcaption>
                                </div>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1"> why overstock profesional? </h3>
                            </Col>
                            <Col sm={12} md={5}>
                                <div className="ProfBenefitsPoints">
                                    <h3>What makes us different</h3>
                                    <ul className="videoBoxList listStyleNone">
                                        {WHY_OPROFESSIONAL && WHY_OPROFESSIONAL.map(Obj => <li key={Obj.id}><p>{Obj.value}</p></li>)}
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={12} md={7}>
                                <div className="ProfBenefitsBox"> Video </div>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="designer">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1"> Designer Benefits  </h3>
                                <p className="paragraph_Txt">{GOV_BUYER_TEXT}</p>
                            </Col>
                            <Grid>
                                <Row>
                                    <Col sm={12}>
                                        <div className="ProfBenefitsBox"> image </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <div className="ProfBenefitsBox">
                                            <h3>Interior Designer</h3>
                                        </div>
                                        <p className="paragraph_Txt">{GOV_BUYER_TEXT}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <div className="ProfBenefitsBox">
                                            <h3> Architect </h3>
                                        </div>
                                        <p className="paragraph_Txt">{GOV_BUYER_TEXT}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="signBtnOutWrap">
                                        <Button type="submit" className="navigatebutton" onClick={this.scrollToTop}>Sign Up </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="government">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1"> Solutions for Government Buyers  </h3>
                                <div className="ProfBenefitsBox"> image </div>
                                <p className="paragraph_Txt">{GOV_BUYER_TEXT}</p>
                            </Col>
                            <Col md={6} sm={12}>
                                <ol className="listtype">
                                    <li>■ COMPETITIVE PRODUCT PRICING </li>
                                    <li>
                                    ■ DEDICATED NATIONAL SUPPORT TEAM & 2,200 + LOCATIONS
                                    </li>
                                    <br/>
                                    <p className="spaceBuy">
                                        {'There\'s no cost to participate and no minimum spending requirement to access:'}
                                    </p>
                                    {MIN_SPENDING_REQUIREMENT && MIN_SPENDING_REQUIREMENT.map(Obj => <li className="spacePoints" key={Obj.id}>{Obj.value}</li>)}
                                </ol>
                            </Col>
                            <Col md={6} sm={12}>
                                <ol className="listtype">
                                    <li>■ LOW-COST AND RETURN OPTIONS</li>
                                    <li>■ CONVENIENT PAYMENT OPTIONS</li>
                                    <br/>
                                    <p className="spaceBuy">U.S. Communities is a government cooperative purchasing program that combines and strengthens the purchasing power of public entities nationwide. The result is reduced cost and the assurance that your agency meets the requirements for competitive solicitation.</p>
                                    <p>Together we enable</p>
                                    {GOVT_REQUIREMENT && GOVT_REQUIREMENT.map(Obj => <li key={Obj.id}>{Obj.value}</li>)}
                                </ol>
                            </Col>
                            <Col sm={12}>
                                <p className="paragraph_Txt">
                                    {ABOUT_RIGHTS}
                                </p>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1_CAP">SUPPORTING OUR FEDERAL CUSTOMERS</h3>
                                <p className="paragraph_Txt">{ABOUT_FEDERAL_CUSTOMERS}</p>
                                <div className="ProfBenefitsBox"> image </div>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1_CAP">SIMPLIFYING TAX EXEMPTION</h3>
                                <p className="paragraph_Txt">With our one-step tax exempt registration, tax exempt customers,including buyers for state and local governments or state-defined exempt organizations,retailers,resellers and manufacturers in longer have to complete the instore paperwork with every exempt transaction.</p>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase">
                        <Row>
                            <Col sm={12} md={4} className="textLeftAlign">
                                <div className="boxOutsideWrap">
                                    <span className="box1">icon </span>
                                </div>
                            </Col>
                            <Col sm={12} md={4} className="textCenterAlign">
                                <div className="boxOutsideWrap">
                                    <span className="box1">icon </span>
                                </div>
                            </Col>
                            <Col sm={12} md={4} className="textRightAlign">
                                <div className="boxOutsideWrap">
                                    <span className="box1">icon </span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className="signBtnOutWrap">
                                <Button type="submit" className="navigatebutton" onClick={this.scrollToTop}>Sign Up </Button>
                            </Col>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="corporate">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1">
                                    Corporate Benefits
                                    <span> (overview & educational) </span>
                                </h3>
                                <p className="paragraph_Txt">{GOV_BUYER_TEXT}</p>
                            </Col>
                            <Grid>
                                <Row>
                                    <Col sm={12}>
                                        <div className="ProfBenefitsBox"> image </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} sm={12}>
                                        <div className="ProfBenefitsBox">
                                            <h3>Education Use Case Content</h3>
                                        </div>
                                        <p className="paragraph_Txt">{GOV_BUYER_TEXT}</p>
                                    </Col>
                                    <Col md={6} sm={12}>
                                        <div className="ProfBenefitsBox">
                                            <h3> Contractor Use Case Content </h3>
                                        </div>
                                        <p className="paragraph_Txt">{GOV_BUYER_TEXT}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="signBtnOutWrap">
                                        <Button type="submit" className="navigatebutton" onClick={this.scrollToTop}>Sign Up </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Row>
                    </section>
                    <section className="ProfBenefitsBase" id="business">
                        <Row>
                            <Col md={12}>
                                <h3 className="title_header1">
                                    Just Right for Your Small Business
                                    <span> (overview & educational) </span>
                                </h3>
                                <p className="paragraph_Txt">
                                    {GOV_BUYER_TEXT}
                                </p>
                            </Col>
                            <Grid>
                                <Row>
                                    {SMALL_BUSINESS_INFO && SMALL_BUSINESS_INFO.map(Obj => (
                                        <Col key={Obj.id} md={6} sm={12}>
                                            <div className="ProfBenefitsBox">
                                                <h3>{Obj.value}</h3>
                                            </div>
                                        </Col>))}
                                    <Col md={12} sm={12}>
                                        <p className="paragraph_Txt">
                                            {GOV_BUYER_TEXT}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} className="signBtnOutWrap marginBottom">
                                        <Button type="submit" className="navigatebutton" onClick={this.scrollToTop}>Sign Up </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Row>
                    </section>
                </Grid>
                <ShopSocial />
            </div>
        );
    }
}

export default FooterDetail;
