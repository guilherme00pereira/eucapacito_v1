const Error = ({ statusCode }) => {
    return (
        <div>
            {statusCode === 404 ?
                <div>404 | Página não encontrada</div> :
                <div>500 | Erro</div>
            }
        </div>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error