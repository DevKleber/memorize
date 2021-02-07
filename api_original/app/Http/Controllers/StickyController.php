<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;

class StickyController extends Controller
{
    public function index()
    {
        $sticky = \App\Sticky::where('id_usuario', auth('api')->user()->id)->where('bo_ativo', true)->get();
        if (!$sticky) {
            return response(['response' => 'Não existe Sticky'], 400);
        }

        return response(['dados' => $sticky]);
    }

    public function store(Request $request)
    {
        $request['id_usuario'] = auth('api')->user()->id;
        $sticky = \App\Sticky::create($request->all());
        if (!$sticky) {
            return  response(['response' => 'Erro ao salvar Sticky'], 400);
        }

        return response(['response' => 'Salvo com sucesso', 'dados' => $sticky]);
    }

    public function show($id)
    {
        $sticky = \App\Sticky::find($id);
        if ($sticky->id_usuario != auth('api')->user()->id) {
            return response(['response' => 'Sem permissão'], 400);
        }
        if (!$sticky) {
            return response(['response' => 'Não existe Sticky'], 400);
        }

        return response($sticky);
    }

    public function byCat($id)
    {
        $sticky = \App\Sticky::where('id_usuario', auth('api')->user()->id)->where('bo_ativo', true)->where('id_categoria', $id)->get();
        if (!$sticky) {
            return response(['response' => 'Não existe Sticky'], 400);
        }

        return response(['dados' => $sticky]);
    }

    public function update(Request $request, $id)
    {
        $sticky = \App\Sticky::find($id);
        if ($sticky->id_usuario != auth('api')->user()->id) {
            return response(['response' => 'Sem permissão'], 400);
        }

        if (!$sticky) {
            return response(['response' => 'Sticky Não encontrado'], 400);
        }
        $sticky = Helpers::processarColunasUpdate($sticky, $request->all());

        if (!$sticky->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return response(['response' => 'Atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $sticky = \App\Sticky::find($id);
        if ($sticky->id_usuario != auth('api')->user()->id) {
            return response(['response' => 'Sem permissão'], 400);
        }

        if (!$sticky) {
            return response(['response' => 'Sticky Não encontrado'], 400);
        }
        $sticky->bo_ativo = false;
        if (!$sticky->save()) {
            return response(['response' => 'Erro ao deletar Sticky'], 400);
        }

        return response(['response' => 'Sticky Inativado com sucesso']);
    }
}
