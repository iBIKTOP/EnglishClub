import React from 'react';

export default class Registration extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="card w-50 mx-auto mt-3">
                    <div className="card-header">Регистрация</div>
                    <div className="card-body">
                        <form method="post" action="">
                            <div className="form-group">
                                <label>Логин:</label>
                                <input type="text" className="form-control" name="login" aria-describedby="emailHelp" placeholder=""></input>
                            </div>
                            <div className="form-group">
                                <label>Пароль:</label>
                                <input type="password" className="form-control" name="pass1" placeholder=""></input>
                            </div>
                            <div className="form-group">
                                <label>Пароль, еще раз:</label>
                                <input type="password" className="form-control" name="pass2" placeholder=""></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Зарегестрироваться</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}