export const MotivoCancelamento = {
    MEDICO_CANCELOU: 'Médico cancelou',
    PACIENTE_DESISTIU: 'Paciente desistiu',
    OUTROS: 'Outros',
    getOptionLabel(reason: string): string {
        if(reason === 'MEDICO_CANCELOU') {
            return MotivoCancelamento.MEDICO_CANCELOU;
        } else if(reason === 'PACIENTE_DESISTIU') {
            return MotivoCancelamento.PACIENTE_DESISTIU;
        } else if(reason === 'OUTROS') {
            return MotivoCancelamento.OUTROS;
        } else {
            return '';
        }
    }
}