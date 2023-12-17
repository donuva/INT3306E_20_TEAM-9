import React, { useState, useEffect } from 'react';

const Articles = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://api.rss2json.com/v1/api.json?rss_url=https://vnexpress.net/rss/giao-duc.rss'
                );
                const result = await response.json();
                setData(result.items);
            } catch (error) {
                setError('Có lỗi xảy ra khi xử lý dữ liệu từ API. Vui lòng thử lại sau.');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="" style={{ margin: 'auto', marginTop: '20px' }}>
            <div>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {data.map((item, index) => {
                    const pattern = /<img src="([^"]+)"/;
                    const matches = item.description.match(pattern);
                    var preSrc = matches ? matches[1] : '';
                    var scnSrc = preSrc.replace("https://vcdn1-", "https://i1-")
                    const imgSrc = scnSrc.replace(/amp;/g, '')

                    return (
                        <div style={{ textAlign: 'left' }} className="col-sm-5 mx-auto my-3" key={index}>
                            <div className="card flex-sm-row mb-4 box-shadow h-sm-250">
                                <div className="row no-gutters">
                                    <div className="col-sm-7">
                                        <div className="card-body">
                                            <p style={{ textAlign: 'left', color: 'blue' }} >News</p>

                                            <h2 className="mb-0" style={{ fontSize: '1.5rem' }}>
                                                <a className="text-dark font-weight-bold" href={item.link} style={{ textDecoration: 'none' }}>
                                                    {item.title}
                                                </a>
                                            </h2>
                                            <p style={{ fontSize: '1.2rem' }} className="card-text mb-auto">
                                                {item.description.replace(/<[^>]*>/g, '')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <img
                                            className="card-img-right flex-auto d-none d-sm-block w-100"
                                            data-src={imgSrc}
                                            style={{ width: '100%', height: 'auto' }}
                                            src={imgSrc}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>
        </div>
    );
};

export default Articles;